export default function DugHistoryCard(Props) {
    return (
        <div style={{ maxWidth: '200px', margin: '0 auto', padding: '1rem' }}>
            <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={Props.image} alt="Card" style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} />
            </div>
            <div style={{ padding: '1rem' }}>
                <p style={{ margin: '0', fontWeight: 'bold' }}>Categoria: {Props.category}</p>
                <p style={{ margin: '0', color: 'gray' }}>Detectado en {Props.app} el día {Props.date} a las {Props.time}</p>
            </div>
        </div>
    )

}