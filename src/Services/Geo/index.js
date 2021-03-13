import axios from 'axios';
export const googleAPIKey = 'AIzaSyBuinFicS4HAGfIKW6rRutGFP9GWcReUn4';
export async function reverseGeo(lat, lng) {
  const result = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleAPIKey}`
  );
  if (result && result.data) {
    return result.data;
  }
  return null;
} 
const translations = {
  en: require('./Translate/en.json'),
  vn: require('./Translate/vn.json')
};
export const SupportedLanguage = {
  vn :'vn',
  en : 'en'
}
export const getTranslation = (lang, text, type) => {
  var translateText = text;
  if (translations[lang] && translations[lang][text]) {
    translateText = translations[lang][text];
  }
  return translateText;
};