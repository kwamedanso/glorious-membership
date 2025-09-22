import { useRef } from 'react';
// import { toPng } from 'html-to-image';

// import { QRCode } from 'qrcode.react';

// In the QR code section:
{/* <QRCode
    value={member.id}
    size={60}
    level="H"
    includeMargin={false}
/> */}


export default function IDPage() {
    const componentRef = useRef();

    const handleExport = async () => {
        if (componentRef.current === null) return;

        try {
            const { toPng } = await import('html-to-image');

            const dataUrl = await toPng(componentRef.current, {
                quality: 1,
                pixelRatio: 3,
                backgroundColor: '#ffffff',
                style: {
                    transform: 'scale(1)',
                    transformOrigin: 'top left'
                }
            });

            const link = document.createElement('a');
            link.download = `id-card-${memberData?.id || 'member'}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Error exporting image:', error);
        }
    };

    // Sample data - replace with actual member data
    const member = {
        name: 'John Kwame Mensah',
        calling: 'Deacon',
        nationality: 'Ghanaian',
        gpsAddress: 'GW-1234-5678',
        contact: '+233 24 123 4567',
        id: 'COP-7A1F4D9E',
        profilePicture: null // URL or base64 image
    };

    return (
        <div className="id-page-container">
            <div ref={componentRef} className="id-card">
                {/* Header Section */}
                <div className="id-card-header">
                    <div className="church-logo">⛪</div>
                    <div className="church-info">
                        <h2>The Church of Pentecost</h2>
                        <h3>Glorious Assembly</h3>
                        <p>New Mamprobi District</p>
                    </div>
                    <div className="id-badge">ID CARD</div>
                </div>

                {/* Main Content */}
                <div className="id-card-content">
                    {/* Left Side - Profile Picture */}
                    <div className="profile-section">
                        <div className="profile-picture">
                            {member.profilePicture ? (
                                <img src={member.profilePicture} alt="Profile" />
                            ) : (
                                <div className="profile-placeholder">👤</div>
                            )}
                        </div>
                        <div className="member-id">{member.id}</div>
                    </div>

                    {/* Right Side - Member Details */}
                    <div className="details-section">
                        <div className="detail-row">
                            <span className="label">NAME :</span>
                            <span className="value">{member.name}</span>
                        </div>

                        <div className="detail-row">
                            <span className="label">CALLING :</span>
                            <span className="value">{member.calling}</span>
                        </div>

                        <div className="detail-row">
                            <span className="label">NATIONALITY :</span>
                            <span className="value">{member.nationality}</span>
                        </div>

                        <div className="detail-row">
                            <span className="label">GPS ADDRESS :</span>
                            <span className="value">{member.gpsAddress}</span>
                        </div>

                        <div className="detail-row">
                            <span className="label">CONTACT :</span>
                            <span className="value">{member.contact}</span>
                        </div>

                        <div className="detail-row">
                            <span className="label">ID :</span>
                            <span className="value">{member.id}</span>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="id-card-footer">
                    <div className="qr-code">
                        <div className="qr-placeholder">
                            <div className="qr-symbol">
                                {/* <QRCode
                                    value={member.id}
                                    size={60}
                                    level="H"
                                    includeMargin={false}
                                /> */}
                            </div>
                            <span>QR Code</span>
                        </div>
                    </div>
                    <div className="copyright">
                        The Church of Pentecost © Glorious Assembly © New Mamprobi District ©
                    </div>
                </div>
            </div>

            <button className="export-button" onClick={handleExport}>
                Download ID Card
            </button>
        </div>
    );
}