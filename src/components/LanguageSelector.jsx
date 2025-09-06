export default function LanguageSelector({ lang, setLang }) {
  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      className="lang-select"
    >
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
      <option value="mr">मराठी</option>
      <option value="or">Odia</option>
      <option value="gu">ગુજરાતી</option>
      <option value="ta">தமிழ்</option>
      <option value="te">తెలుగు</option>
    </select>
  );
}