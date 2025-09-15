// index.js - Express app for /analyze

import 'dotenv/config'; // <-- add this line at very top
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import bodyParser from 'body-parser';

// import { VertexAI } from "@google-cloud/vertexai";
cd
// const vertexAI = new VertexAI({ project: process.env.GCP_PROJECT, location: "us-central1" });
// const model = vertexAI.preview.getGenerativeModel({ model: "gemini-1.5-flash" });

// async function aiClassifyClaim(claim) {
//   const prompt = `You are a fact-checking assistant. 
// Given the statement: "${claim}"
// Classify it into one of: "likely true", "likely false", or "uncertain".
// Provide a short reasoning and a confidence percentage from 0-100. 
// Respond in JSON: {"label": "...", "confidence": 0-100, "reason": "..."}`;

//   const result = await model.generateContent(prompt);
//   const text = result.response.candidates[0].content.parts[0].text;
//   try {
//     return JSON.parse(text);
//   } catch (e) {
//     console.error("AI returned unparsable output:", text);
//     return { label: "uncertain", confidence: 50, reason: "Unable to parse AI response" };
//   }
// }

// // Inside /analyze endpoint, after fact-check step:
// if (reviews.length === 0) {
//   console.log("No fact-check found, using AI classification...");
//   const aiResult = await aiClassifyClaim(content);
//   score = aiResult.confidence;
//   label = aiResult.label;
//   reasons.push({ publisher: "Vertex AI", rating: aiResult.label, summary: aiResult.reason });
// }


const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '1mb'}));

const PORT = process.env.PORT || 8080;
const FACTCHECK_KEY = process.env.FACTCHECK_API_KEY || '';

function mapReviewRatingToLabel(text) {
  if (!text) return 'unknown';
  const t = text.toLowerCase();
  if (t.includes('true') || t.includes('mostly true') || t.includes('accurate')) return 'true';
  if (t.includes('false') || t.includes('mostly false') || t.includes('fabricat')) return 'false';
  return 'other';
}

async function searchFactCheck(query) {
  if (!FACTCHECK_KEY) return {items: []};
  const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(query)}&key=${FACTCHECK_KEY}`;
  const resp = await fetch(url);
  if (!resp.ok) return {items: []};
  return await resp.json();
}

app.post('/analyze', async (req, res) => {
  try {
    const { content='' } = req.body;
    if (!content) return res.status(400).json({error: 'No content provided'});
    const fc = await searchFactCheck(content);
    const items = fc.claims || [];
    let reviews = [];
    for (const it of items) {
      const claimReviews = it.claimReview || [];
      for (const cr of claimReviews) {
        reviews.push({
          publisher: cr.publisher?.site || cr.publisher?.name || 'unknown',
          url: cr.url || '',
          reviewRating: cr.textualRating || '',
          snippet: cr.title || ''
        });
      }
    }
    let score = null, label = 'Unchecked';
    if (reviews.length) {
      let nTrue=0,nFalse=0,nOther=0;
      for (const r of reviews) {
        const mapped = mapReviewRatingToLabel(r.reviewRating);
        if (mapped==='true') nTrue++;
        else if (mapped==='false') nFalse++;
        else nOther++;
      }
      const nTotal = nTrue+nFalse+nOther;
      score = Math.round(100*(nTrue/nTotal));
      label = score>=66?'Likely True':score<=33?'Likely False':'Mixed';
    }
    res.json({ok:true, score, label, reasons:reviews, sources:reviews.map(r=>({title:r.publisher,url:r.url}))});
  } catch(e) {
    res.status(500).json({error:e.message});
  }
});

app.listen(PORT, ()=>console.log(`Listening on ${PORT}`));
