import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import classes from "./code.module.css";

const Code = ({ children, language }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div className={classes.code}>
      <CopyToClipboard text={children} onCopy={() => setCopied(true)}>
        <div className={`${classes["icon"]} ${classes["copy-icon"]}`}>
          {copied ? (
            <ContentPasteIcon color="primary" />
          ) : (
            <ContentCopyIcon color="primary" />
          )}
        </div>
      </CopyToClipboard>
      <SyntaxHighlighter language={language} style={materialDark}>
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;
