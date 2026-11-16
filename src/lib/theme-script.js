export const THEME_KEY = 'infyta-theme';
export const THEME_COLORS = { light: '#F4F6FA', dark: '#1F2C62' };

export function saveTheme(theme, getStorage = () => window.localStorage) {
  try {
    getStorage().setItem(THEME_KEY, theme);
    return true;
  } catch {
    return false;
  }
}

// Runs in <head> before first paint. Plain ES5; only an exact 'light' or 'dark' choice is applied.
export const themeScript = `(function(){try{var c=${JSON.stringify(THEME_COLORS)};var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;var m=document.querySelectorAll('meta[name="theme-color"]');for(var i=0;i<m.length;i++){m[i].content=c[t];}}}catch(e){}})();`;
