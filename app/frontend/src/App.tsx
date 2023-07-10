import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {nord} from 'react-syntax-highlighter/dist/esm/styles/prism'

function App() {
    const [input, setInput] = useState("")
    return (
        <div id="App">
            <textarea 
                className='textarea' 
                value={input} 
                onChange={e => setInput(e.target.value)}
            />
            <ReactMarkdown 
                children={input} 
                className="markdown" 
                components={{
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        {...props}
                        children={String(children).replace(/\n$/, '')}
                        style={nord}
                        showLineNumbers
                        language={match[1]}
                        PreTag="div"
                      />
                    ) : (
                      <code {...props} className={className}>
                        {children}
                      </code>
                    )
                  }
                }}
                />
        </div>
    )
}

export default App
