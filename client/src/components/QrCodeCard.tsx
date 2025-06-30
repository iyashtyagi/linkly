import QrCode from "react-qr-code";
const QrCodeCard = ({slug}: {slug: string}) => {
    return (
        <div className="h-auto m-auto w-full">
            <QrCode
                id={`qr-svg-${slug}`}
                className="h-auto max-w-full w-full" 
                value={`${window.location.host}/${slug}?qr=1`} 
                level="H" 
            />
        </div>
    );
};

export default QrCodeCard