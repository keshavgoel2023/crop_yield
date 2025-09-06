import LanguageSelector from "./LanguageSelector";
import NotificationBell from "./NotificationBell";

export default function Header({ lang, setLang, t, notifications }) {
  return (
    <header className="header">
      <h1>{t.title}</h1>
      <div className="header-right">
        <LanguageSelector lang={lang} setLang={setLang} />
        <NotificationBell notifications={notifications} />
      </div>
    </header>
  );
}