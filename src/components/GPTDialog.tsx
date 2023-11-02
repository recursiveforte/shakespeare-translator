import {useState} from "react";

export const GPTDialog = () => {
    const [text, setText] = useState<string>("");
    const [response, setResponse] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    return (
        <div className={"flex align-middle w-screen justify-center"}>
            <div className={"flex flex-col w-1/2 mt-10"}>
                <h1 className={"text-3xl mb-5"}>Shakespearean Text Translator</h1>
            <textarea onChange={event => {
                setText(event.target.value)
            }} value={text} className={"border-black border-2 h-52 p-2"} placeholder={"Plain english text here..."}></textarea>
            <br/>
            <button onClick={() => {
                setLoading(true)
                fetch("/convert", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        input: text
                    })
                }).then(response => {
                    console.log(response)
                    response.json().then(json => {
                        setResponse(json.message)
                        setLoading(false)
                    })
                })
            }} className={"border-black border-2 justify-self-start w-40"}>Generate</button>
            <br/>
            <div className={"border-black border-2 h-60 p-2"}>
                {loading && <p className={"text-gray-500"}>Loading...</p>}
                {response.split("\n").map((line, index) => <span id={index.toString()}>{line}<br/></span>)}
            </div>
                <br/>
                <div>Made by <a href={"https://github.com/recursiveforte"} className={"underline"}>Cheru Berhanu</a>.</div>
            </div>
        </div>
    )
}