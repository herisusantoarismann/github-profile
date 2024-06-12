import { useEffect } from "react";

const Hotjar = ({ children }) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.innerHTML = `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${process.env.HOTJAR_ID},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`;

    document.getElementsByTagName("head")[0].appendChild(script);
  }, []);

  return <>{children}</>;
};

const Support = ({ children }) => {
  return process.env.HOTJAR_ID ? <Hotjar>{children}</Hotjar> : <>{children}</>;
};

export default Support;
