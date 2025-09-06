import { useState, useEffect } from "react";
import Header from "./components/Header";
import SensorGrid from "./components/SensorGrid";
import MoistureChart from "./components/MoistureChart";
import Notifications from "./components/Notifications";
import Weather from "./components/Weather";
import "./App.css";

// 🌍 Translations
const translations = {
  en: { 
    title: "🌱 Smart Agriculture Dashboard", notifications: "Notifications", empty: "No notifications yet",
    moisture: "Moisture", ph: "pH", tds: "TDS", temperature: "Temperature", humidity: "Humidity",
    trendMoisture: "📊 Moisture Level Trend", weatherTitle: "Weather Report" 
  },
  hi: { 
    title: "🌱 स्मार्ट कृषि डैशबोर्ड", notifications: "सूचनाएं", empty: "कोई सूचना नहीं",
    moisture: "नमी", ph: "pH", tds: "टीडीएस", temperature: "तापमान", humidity: "आर्द्रता",
    trendMoisture: "📊 नमी स्तर का ग्राफ", weatherTitle: "मौसम रिपोर्ट" 
  },
  mr: {
    title: "🌱 स्मार्ट शेती डॅशबोर्ड", notifications: "सूचना", empty: "अद्याप कोणतीही सूचना नाही",
    moisture: "आर्द्रता", ph: "pH", tds: "TDS", temperature: "तापमान", humidity: "आर्द्रता",
    trendMoisture: "📊 आर्द्रतेचा ग्राफ", weatherTitle: "हवामान अहवाल"
  },
  or: {
    title: "🌱 ସ୍ମାର୍ଟ କୃଷି ଡ୍ୟାସବୋର୍ଡ", notifications: "ସୂଚନା", empty: "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ସୂଚନା ନାହିଁ",
    moisture: "ଆର୍ଦ୍ରତା", ph: "pH", tds: "TDS", temperature: "ତାପମାନ", humidity: "ଆର୍ଦ୍ରତା",
    trendMoisture: "📊 ଆର୍ଦ୍ରତା ପରିଚୟ ଗ୍ରାଫ", weatherTitle: "ଖବର ପ୍ରତିବେଦନ"
  },
  gu: {
    title: "🌱 સ્માર્ટ કૃષિ ડેશબોર્ડ", notifications: "સૂચનાઓ", empty: "કોઈ સૂચના નથી",
    moisture: "નમિયાણું", ph: "pH", tds: "TDS", temperature: "તાપમાન", humidity: "આર્દ્રતા",
    trendMoisture: "📊 નમિયાણું સ્તર ગ્રાફ", weatherTitle: "હવામાન રિપોર્ટ"
  },
  ta: {
    title: "🌱 ஸ்மார்ட் வேளாண்மை டாஷ்போர்டு", notifications: "அறிவிப்புகள்", empty: "இன்னும் எந்த அறிவிப்பும் இல்லை",
    moisture: "நனைவு", ph: "pH", tds: "TDS", temperature: "வெப்பநிலை", humidity: "ஈரப்பதம்",
    trendMoisture: "📊 நனைவு நிலை வரிசை", weatherTitle: "வானிலை அறிக்கை"
  },
  te: {
    title: "🌱 స్మార్ట్ వ్యవసాయ డాష్‌బోర్డు", notifications: "సూచనలు", empty: "ఇంకా ఏ సూచనలు లేవు",
    moisture: "తేమ", ph: "pH", tds: "TDS", temperature: "ఉష్ణోగ్రత", humidity: "తేమ",
    trendMoisture: "📊 తేమ స్థాయి గ్రాఫ్", weatherTitle: "వాతావరణ నివేదిక"
  }
};

export default function App() {
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  const [data, setData] = useState({ moisture: 45, ph: 6.5, tds: 700, temperature: 28, humidity: 60 });
  const [notifications, setNotifications] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = {
        moisture: Math.floor(Math.random() * 100),
        ph: (5 + Math.random() * 3).toFixed(2),
        tds: 600 + Math.floor(Math.random() * 200),
        temperature: 20 + Math.floor(Math.random() * 15),
        humidity: 30 + Math.floor(Math.random() * 60),
      };
      setData(newData);

      setHistory((prev) => [
        ...prev.slice(-9),
        { time: new Date().toLocaleTimeString(), moisture: newData.moisture },
      ]);

      const newNotifications = [];
      if (newData.moisture < 30) newNotifications.push({ id: Date.now() + 1, msg: "⚠️ Low Soil Moisture detected!" });
      if (newData.ph < 6 || newData.ph > 7.5) newNotifications.push({ id: Date.now() + 2, msg: "⚠️ Soil pH out of optimal range (6–7.5)!" });
      if (newData.humidity < 40 || newData.humidity > 70) newNotifications.push({ id: Date.now() + 3, msg: "⚠️ Humidity level is not ideal (40–70%)!" });

      if (newNotifications.length > 0) {
        setNotifications((prev) => [...prev, ...newNotifications]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <Header lang={lang} setLang={setLang} t={t} notifications={notifications} />
      <Weather t={t} />
      <SensorGrid data={data} t={t} />
      <MoistureChart history={history} t={t} />
      <Notifications notifications={notifications} t={t} />
    </div>
  );
}