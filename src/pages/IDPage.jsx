import { useRef } from 'react';
import "../components/IDCard.css"
import { QRCodeSVG } from 'qrcode.react';
import logo from "../assets/logo_cop.png"
import profile from "../assets/ghost-squadron-removebg-preview.png"
import { useLocation } from 'react-router-dom';


// const member = {
//     name: "Wade Warren",
//     birthDate: "01.02.1995",
//     nationality: "Sri Lankan",
//     idNumber: "SITS-4569875",
//     expDate: "01.02.2025",
//     profileImage: true,
//     qrCode: null,
//     phoneNumber: "784 658 987 123"
// }
export default function IDPage() {
    const componentRef = useRef();

    const navigate = useLocation()

    const member = navigate?.state?.member

    // console.log(navigate?.state?.member)

    // const handleExport = async () => {
    //     if (componentRef.current === null) return;

    //     try {
    //         const { toPng } = await import('html-to-image');

    //         const dataUrl = await toPng(componentRef.current, {
    //             quality: 1,
    //             pixelRatio: 3,
    //             backgroundColor: '#000000ff',
    //             style: {
    //                 transform: 'scale(1)',
    //                 transformOrigin: 'top left'
    //             }
    //         });

    //         const link = document.createElement('a');
    //         link.download = `id-card-${member?.idNumber || 'member'}.png`;
    //         link.href = dataUrl;
    //         link.click();
    //     } catch (error) {
    //         console.error('Error exporting image:', error);
    //     }
    // };



    // const handleExport = async () => {
    //     if (componentRef.current === null) return;

    //     try {
    //         const { toPng } = await import('html-to-image');
    //         const dataUrl = await toPng(componentRef.current, {
    //             quality: 1,
    //             pixelRatio: 2,
    //             backgroundColor: '#ffffff',
    //         });

    //         // Simple download function
    //         const link = document.createElement('a');
    //         link.download = `id-card-${member.idNumber}.png`;
    //         link.href = dataUrl;
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);

    //         // Mobile helper
    //         if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //             setTimeout(() => {
    //                 alert('Tip: Long-press the ID card image to save it directly');
    //             }, 1000);
    //         }

    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };


    const handleExport = async () => {
        if (componentRef.current === null) return;

        try {
            const html2canvas = await import('html2canvas');

            const canvas = await html2canvas.default(componentRef.current, {
                backgroundColor: '#000000ff',
                scale: 3, // Equivalent to pixelRatio: 3
                useCORS: true,
                allowTaint: true,
                logging: false, // Disable console logging for better performance
                width: componentRef.current.scrollWidth,
                height: componentRef.current.scrollHeight,
                scrollX: 0,
                scrollY: 0,
                windowWidth: componentRef.current.scrollWidth,
                windowHeight: componentRef.current.scrollHeight
            });

            const dataUrl = canvas.toDataURL('image/png', 1.0); // Equivalent to quality: 1

            const link = document.createElement('a');
            link.download = `id-card-${member?.idNumber || 'member'}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Error exporting image:', error);
        }
    };


    return (
        <div className="id-page-container">
            <div ref={componentRef} className="id-card">
                <div className="id-card">
                    <div className="id-logo">
                        <img src={logo} alt="COP_logo" />
                        <p>Glorious (English) Assembly</p>
                    </div>
                    {/* Header Section */}
                    <div className="id-card-header">
                        <div className="profile-image-container">
                            {true ? (
                                <img src={profile} alt="Profile" className="profile-image" />
                            ) : (
                                <div className="profile-placeholder">
                                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="8" r="4" fill="#666" />
                                        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="#666" strokeWidth="2" fill="none" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Name Section */}
                    <div className="name-section">
                        <h2 className="member-name">{member.fullname}</h2>
                    </div>

                    {/* Details Section */}
                    <div className="details-section">
                        <div className="details-contents">
                            <div className="detail-row">
                                <div className="detail-item">
                                    <span className="detail-label">Calling</span>
                                    <span className="detail-value">{member.calling}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Nationality</span>
                                    <span className="detail-value">{member.nationality}</span>
                                </div>
                            </div>

                            <div className="detail-row">
                                <div className="detail-item">
                                    <span className="detail-label">Contact</span>
                                    <span className="detail-value">0{member.call_number}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Gender</span>
                                    <span className="detail-value">{member.gender}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="qr-section">
                        {/* <h3 className="qr-title">Scan QR Code</h3> */}
                        <div className="qr-code-container">
                            <QRCodeSVG
                                value={"KDanso1234"}
                                title={"Title for my QR Code"}
                                size={130}
                                bgColor={"#ffffff"}
                                fgColor={"#000000"}
                                level={"L"}
                                minVersion={7}
                                imageSettings={{
                                    src: "https://upload.wikimedia.org/wikipedia/commons/f/f7/PIWC-COP-Logo.gif",
                                    x: undefined,
                                    y: undefined,
                                    height: 24,
                                    width: 24,
                                    opacity: 1,
                                    excavate: true,
                                }}
                            />
                        </div>
                        <div className="id-number">{member.id}</div>
                    </div>
                </div>
            </div>
            <button className="export-button" onClick={handleExport}>
                Download ID Card
            </button>
        </div>
    );


};