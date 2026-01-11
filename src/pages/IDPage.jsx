import { useRef, useState, useEffect } from 'react';
import styles from "../components/IDCard.module.css"; // Changed import
import { QRCodeSVG } from 'qrcode.react';
import logo from "../assets/logo_cop.png"
import profile from "../assets/ghost-squadron-removebg-preview.png"
import { useLocation } from 'react-router-dom';
import { FaPeopleGroup } from "react-icons/fa6";
import supabase from '../supabaseClient';
import ThreeDotLoader from '../components/ThreeDotLoader';
import { FiPhone, FiCopy, FiX } from 'react-icons/fi';


export default function IDPage() {
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(false)
    const [imagePreview, setImagePreview] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef(null);
    const componentRef = useRef();

    const navigate = useLocation()

    const member = navigate?.state?.member;

    // console.log(typeof member.bible_study_group);


    const copyToClipboard = (number) => {
        let firstCharacter = number.slice(0, 1)
        let isZero = firstCharacter === 0;
        let newNumber = isZero ? number : `0${number}`
        navigator.clipboard.writeText(newNumber);
        alert("Number copied to clipboard!");
    };

    const formatName = (m) => {
        return [m.first_name, m.other_names, m.surname]
            .filter(name => name && name.trim() !== "")
            .join(" ");
    };


    const fetchGroupMembers = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('members')
                .select('first_name, other_names, surname, call_number, whatsapp_number')
                .eq('bible_study_group', member.bible_study_group);

            if (error) throw error;

            setMembers(data);

        } catch (error) {
            console.error("Error fetching members:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroupMembers();
    }, [])


    const fullName = `${member?.first_name} ${member.other_names === null ? "" : member?.other_names} ${member?.surname}`?.split(" ").filter(s => s).join(" ");

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleExport = async () => {
        if (componentRef.current === null) return;

        try {
            const html2canvas = await import('html2canvas');

            const canvas = await html2canvas.default(componentRef.current, {
                backgroundColor: '#000000ff',
                scale: 3,
                useCORS: true,
                allowTaint: true,
                logging: false,
                width: componentRef.current.scrollWidth,
                height: componentRef.current.scrollHeight,
                scrollX: 0,
                scrollY: 0,
                windowWidth: componentRef.current.scrollWidth,
                windowHeight: componentRef.current.scrollHeight
            });

            const dataUrl = canvas.toDataURL('image/png', 1.0);

            const link = document.createElement('a');
            link.download = `id-card-${member?.idNumber || 'member'}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Error exporting image:', error);
        }
    };


    return (
        <div className={styles['id-page-container']}>
            <div ref={componentRef} className={styles['id-card']}>
                <div className={styles['id-card']}>
                    <div className={styles['id-logo']}>
                        <img src={logo} alt="COP_logo" />
                        <p>Glorious (English) Assembly</p>
                    </div>
                    {/* Header Section */}
                    <div className={styles['id-card-header']}>
                        <div className={styles['profile-image-container']}>
                            {imagePreview ? (
                                <img src={imagePreview} alt="Profile Preview" className={styles['profile-image']} style={{ objectFit: "cover" }} />
                            ) : (
                                <div className={styles['profile-placeholder']}>
                                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="8" r="4" fill="#666" />
                                        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="#666" strokeWidth="2" fill="none" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Name Section */}
                    <div className={styles['name-section']}>
                        <h2 className={styles['member-name']}>{fullName}</h2>
                    </div>

                    {/* Details Section */}
                    <div className={styles['details-section']}>
                        <div className={styles['details-contents']}>
                            <div className={styles['detail-row']}>
                                <div className={styles['detail-item']}>
                                    <span className={styles['detail-label']}>Calling</span>
                                    <span className={styles['detail-value']}>{member.calling}</span>
                                </div>
                                <div className={styles['detail-item']}>
                                    <span className={styles['detail-label']}>Nationality</span>
                                    <span className={styles['detail-value']}>{member.nationality}</span>
                                </div>
                            </div>

                            <div className={styles['detail-row']}>
                                <div className={styles['detail-item']}>
                                    <span className={styles['detail-label']}>Contact</span>
                                    <span className={styles['detail-value']}>{member.call_number.slice(0, 1) == 0 ? null : 0}{member.call_number.split(",")[0]}</span>
                                </div>
                                <div className={styles['detail-item']}>
                                    <span className={styles['detail-label']}>Gender</span>
                                    <span className={styles['detail-value']}>{member.gender}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div className={styles['qr-section']}>
                        <div className={styles['qr-code-container']}>
                            <QRCodeSVG
                                value={member.id}
                                title={"Member ID QRCode"}
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
                        <div className={styles['id-number']}>{member.id}</div>
                    </div>
                </div>
            </div>
            <>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    style={{ display: 'none' }}
                />
                <div className={styles['buttons-footer']}>
                    <button className={styles['upload-button']} onClick={() => fileInputRef.current?.click()}>
                        Upload Profile Image
                    </button> <br />
                    <button className={styles['view-group-btn']} onClick={() => setIsModalOpen(true)}>
                        {loading ? "Loading..." : "View Group"} <FaPeopleGroup />
                    </button>
                    <button className={styles['export-button']} onClick={handleExport}>
                        Download ID Card
                    </button>
                </div>


                {isModalOpen && (
                    <div className={styles['modal-overlay']} onClick={() => setIsModalOpen(false)}>
                        <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
                            <div className={styles['modal-header']}>
                                <h3>Group Members</h3>
                                <button className={styles['close-btn']} onClick={() => setIsModalOpen(false)}>
                                    <FiX />
                                </button>
                            </div>

                            <div className={styles['members-list']}>
                                {members.map((member, index) => (
                                    <div key={index} className={styles['member-item']}>
                                        <div className={styles['member-info']}>
                                            <p className={styles['member-label-text']}>
                                                <strong>Name:</strong> {formatName(member)}
                                            </p>

                                            <div className={styles['number-row']}>
                                                <p className={styles['member-label-text']}>
                                                    <strong>Phone:</strong>{member.call_number.startsWith("0") ? "" : 0}{member.call_number}
                                                </p>
                                                <div className={styles['action-icons']}>
                                                    <a href={`tel:${member.call_number.startsWith('0') ? member.call_number : `0${member.call_number}`}`} className={`${styles['icon-link']} ${styles['call']}`} title="Call">
                                                        <FiPhone />
                                                    </a>
                                                    <button
                                                        className={`${styles['icon-link']} ${styles['copy']}`}
                                                        onClick={() => copyToClipboard(member.call_number)}
                                                        title="Copy"
                                                    >
                                                        <FiCopy />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </>
        </div >
    );
};