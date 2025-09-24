import { useState, useRef } from 'react';


export default function ImagePreview() {
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
            />

            {imagePreview ? (
                <div>
                    <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                            width: '150px',
                            height: '150px',
                            objectFit: 'contain',
                            // borderRadius: '50%'
                        }}
                    />
                    <br />
                    <button onClick={() => fileInputRef.current?.click()}>
                        Change Image
                    </button>
                </div>
            ) : (
                <button onClick={() => fileInputRef.current?.click()}>
                    Upload Profile Image
                </button>
            )}
        </div>
    )
}
