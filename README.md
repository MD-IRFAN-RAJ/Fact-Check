# 🧠 Fact-Check Web Extension  

![Fact-Check Extension Screenshot](./images/fact-check-extension.png "Fact-Check Extension")

[![GitHub stars](https://img.shields.io/github/stars/MD-IRFAN-RAJ/Fact-Check.svg?style=social&label=Star)](https://github.com/MD-IRFAN-RAJ/Fact-Check) 
[![GitHub forks](https://img.shields.io/github/forks/MD-IRFAN-RAJ/Fact-Check.svg?style=social&label=Fork)](https://github.com/MD-IRFAN-RAJ/Fact-Check/network) 
[![GitHub issues](https://img.shields.io/github/issues/MD-IRFAN-RAJ/Fact-Check.svg)](https://github.com/MD-IRFAN-RAJ/Fact-Check/issues)

**Fact-Check** is a lightweight and powerful web extension that lets you **instantly verify statements** you come across while browsing.  
S

imply **highlight any text**, and the extension will fetch a truthfulness score using **Google Fact Check API** – right inside your browser.

---

## ✨ Features  

✅ **Instant Results** – Get fact-check results in real time  
✅ **Clean & Simple UI** – Minimal and distraction-free design  
✅ **Cross-Browser Support** – Works on Chrome, Firefox, Edge & more  
✅ **Privacy-Friendly** – Only processes selected text, nothing else  

---

## 🚀 Installation  

Follow these steps to set up **Fact-Check** locally:  

1. **Clone the Repository**  
    ```bash
    git clone https://github.com/MD-IRFAN-RAJ/Fact-Check.git
    ```

2. **Set Up the Backend**  
    ```bash
    cd backend
    npm install
    ```
    - Copy `.env.example` → create `.env`  
    - Paste your API key inside `.env`

3. **Start the Backend Server**  
    ```bash
    node index.js
    ```

4. **Load the Extension**  
   - Open your browser and go to **Extensions**  
   - Enable **Developer Mode**  
   - Click **Load Unpacked** → Select the `extension` folder from the project  

5. **Start Fact-Checking!**  
   - Visit any website  
   - Select a piece of text  
   - A **popup** with fact-check results will appear  

---

## 📝 Usage  

Use this extension for **basic fact-checking** and **learning purposes**.  
Keep in mind that not every fact is routinely verified by agencies, so some statements may return *unchecked* results.  

🔍 **Example:**  
> Try selecting  
> **"Steve Jobs is founder of Apple"**  
> and see what result you get!

---

## 🤝 Contributing  

Contributions are welcome!  
- Open an **issue** to discuss bugs or feature requests  
- Submit a **pull request** with improvements  

---

## 📜 License  

This project is licensed under the **[MIT License](https://github.com/MD-IRFAN-RAJ/Fact-Check/blob/master/LICENSE)**.  

---

💡 **Enjoy Fact-Checking & Stay Informed!**  
If you like this project, ⭐ it on GitHub and share it with others.
