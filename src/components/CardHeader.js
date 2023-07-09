import * as React from 'react';

export default function CardHeader(props) {

    async function handleRefresh() {
        console.log("refreshing", props.refreshLink)
        console.log("height", props.leftIconHeight)
        console.log("width", props.leftIconWidth)
    }

    return (
        <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', padding: '1rem', marginBottom: '0.625rem', maxWidth: '100%'}}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <div style={{ backgroundColor: '#603BB0', borderRadius: '0.75rem', padding: '1rem' }}>
                        <img src={props.leftIcon} width={props.leftIconWidth} height={props.leftIconHeight} alt='SoyMomo Logo' />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#603BB0', marginLeft: '0.75rem' }}>{props.title}</h1>
                        <p style={{ fontSize: '0.875rem', color: '#603BB0', alignSelf: 'flex-start', marginLeft: '0.75rem' }}>{props.subtitle}</p>
                    </div>
                </div>
                <div onClick={handleRefresh} style={{ backgroundColor: '#603BB0', borderRadius: '0.75rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
                    <img src="/images/tableIcons/cs-refreshIcon.svg" width={16} height={16} alt='SoyMomo Logo' />
                </div>
            </div>
            <div style={{  maxWidth: '100%', marginTop: '0.75rem' }}>
                {props.children}
            </div>
        </div>
    )
}