import React, { useState } from 'react'

function GenQR() {

    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageSrc, setImageSrc] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isBtnClicked, setIsBtnClicked] = useState(false);

    const handleSubmit = async () => {
        if (url === "") {
            alert('URL cannot be empty!')
            return;
        }
        setIsBtnClicked(true);
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/genqr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            if (response.ok) {
                const blob = await response.blob();
                setImageSrc(URL.createObjectURL(blob));
            } else {
                setErrorMessage(response.statusText);
            }
            setLoading(false)
        } catch (error) {
            setErrorMessage(error?.message ? error?.message : "Could not process the API!");
            setLoading(false)
        }
    };

    return (
        <div
            className="h-screen w-screen overflow-y-auto flex flex-col gap-y-4 bg-[#123456] text-white justify-center items-center"
        >
            <div className="text-2xl pb-2 leading-none">QR Code Generator</div>
            <input
                id="url"
                name="url"
                type="url"
                className="w-72 h-10 rounded-md py-1 px-2 text-gray-700"
                placeholder="Enter a valid url..."
                onChange={event => setUrl(event.target.value)}
            />
            <button
                className="w-72 h-10 rounded-md p-2 bg-green-600"
                onClick={handleSubmit}
            >
                Generate QR
            </button>
            {isBtnClicked && loading
                ? <div className='text-xl leading-none'>Loading...</div>
                : errorMessage
                    ? <div className='text-xl leading-none'>{errorMessage}</div>
                    : imageSrc
                        ? <img
                            src={imageSrc}
                            alt="QR Code"
                            className='rounded-md'
                        />
                        : null
            }
        </div>
    )
}

export default GenQR