import React, { useEffect, useRef, memo } from 'react';
import "./TradingView.css"

function TradingViewChart() {
  const container = useRef();

  useEffect(() => {
    const scriptId = 'tradingview-script';
    let script = document.getElementById(scriptId);
  
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "container_id": "tradingview-widget-container",
        "symbol": "NASDAQ:AAPL",
        "interval": "60",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "backgroundColor": "#1E1E1E",
        "isTransparent": true,
        "hide_settings":false,
        "gridColor":"#555", 
        "toolbar_bg": "#1E1E1E",
        "hide_side_toolbar": false,
        "withdateranges": true,
        "allow_symbol_change": true,
        "save_image": false,
        "calendar": false,
        "support_host": "https://www.tradingview.com",
        "custom_css_url": '../custom.css',
      });
      container.current.appendChild(script);
  
      script.onload = () => {
        console.log("Script loaded successfully.");
      };
  
      script.onerror = () => {
        console.error("Error loading the script.");
      };
    }
  
    return () => {
      if (script) {
        script.remove(); 
      }
    };
  }, []);
  
  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(TradingViewChart);




