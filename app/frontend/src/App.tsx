import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism'

function App() {
    const [input, setInput] = useState("")
    function getHeader(str: string): string {
        const pos = 0
        let position = 1
        let ch = str[pos]
        for (let i = 0; i < str.length; i++) {
            ch = str[position]
            if (ch === "#") {
                position++
            } else {
                break
            }
        }
        return str.substring(pos, position)
    }
    const testInput = function(e: any) {
        console.log(e.target.children)
        const inp = e.target.textContent
        setInput(inp)
        console.log("Input: " + inp)
        e.target.classList = ''
        if (inp[0] === "#") {
            let header = getHeader(inp)
            console.log(inp.substring(header.length, header.length + 1) === " ")
            if (header.length === 1 && inp.substring(header.length, header.length + 1) === " ") { e.target.classList.add("header") }
            else if (header.length === 2 && inp.substring(header.length, header.length + 1) === " ") { e.target.classList.add("header2") }
            else if (header.length === 3 && inp.substring(header.length, header.length + 1) === " ") { e.target.classList.add("header3") }
            else if (header.length === 4 && inp.substring(header.length, header.length + 1) === " ") { e.target.classList.add("header4") }
            else if (header.length === 5 && inp.substring(header.length, header.length + 1) === " ") { e.target.classList.add("header5") }
            else if (header.length === 6 && inp.substring(header.length, header.length + 1) === " ") { e.target.classList.add("header6") }
            header = ""
        }
    }
    // <input onChange={e => testInput(e)}></input>
    return (
        <div id="App">
    <textarea
        className='textarea'
        value={input}
        onChange={e => setInput(e.target.value)}
    />
            <div id="editor" contentEditable="true" onInput={(e) => testInput(e)}>Hello</div>
            <ReactMarkdown
                children={input}
                className="markdown"
                components={{
                    code({ node, inline, className, children, ...props }) {
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
