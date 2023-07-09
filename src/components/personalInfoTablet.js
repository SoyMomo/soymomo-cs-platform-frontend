const tableHeaderStyle = {
    padding: '12px 16px',
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    textAlign: 'left',
    borderBottom: '1px solid #e8e8e8',
};

const tableCellStyle = {
    padding: '10px 16px',
    borderBottom: '1px solid #e8e8e8',
    textAlign: 'left',
};

export default function PersonalInfoTablet(Props) {
    const personalInfo = Props.personalInfo;

    function handleName() {
        console.log('Name');
    }

    function handleEmail() {
        console.log('Email');
    }

    function handlePin() {
        console.log('Pin');
    }

    function handleInternetNavigation() {
        console.log('Internet navigation');
    }

    function handleDetectionAlgorithm() {
        console.log('Detection algorithm');
    }

    function handleCyberbullying() {
        console.log('Cyberbullying');
    }

    return (
        <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', padding: '1rem', marginBottom: '0.625rem', Width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ backgroundColor: '#603BB0', borderRadius: '0.75rem', padding: '1rem' }}>
                        <img src="/images/tableIcons/cs-infoPrincipal.svg" width={23} height={23} alt='SoyMomo Logo' />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#603BB0', marginLeft: '0.75rem' }}>Datos personales</h1>
                        <p style={{ fontSize: '0.875rem', color: '#603BB0', alignSelf: 'flex-start', marginLeft: '0.75rem' }}>Tablet</p>
                    </div>
                </div>
                <div style={{ backgroundColor: '#603BB0', borderRadius: '0.75rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
                    <img src="/images/tableIcons/cs-refreshIcon.svg" width={16} height={16} alt='SoyMomo Logo' />
                </div>
            </div>
            <div style={{ maxWidth: '100%', marginTop: '0.75rem', display: "flex", flexWrap: 'wrap' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={tableHeaderStyle}>Datos principales</th>
                            <th style={tableHeaderStyle}></th>
                            <th style={tableHeaderStyle}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={tableCellStyle}>Nombre:</td>
                            <td style={tableCellStyle}>{personalInfo.name}</td>
                            <td style={tableCellStyle}><button onClick={handleName} style={{borderRadius: '1rem', backgroundColor: 'lightgray', color: '#22478E', padding: '0.25rem', width: '100px', marginTop: '0.5rem' }}>Modificar</button></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Email de recuperación:</td>
                            <td style={tableCellStyle}>{personalInfo.email}</td>
                            <td style={tableCellStyle}><button onClick={handleEmail} style={{borderRadius: '1rem', backgroundColor: 'lightgray', color: '#22478E', padding: '0.25rem', width: '100px', marginTop: '0.5rem' }}>Modificar</button></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>PIN:</td>
                            <td style={tableCellStyle}>{personalInfo.pin}</td>
                            <td style={tableCellStyle}><button onClick={handlePin} style={{borderRadius: '1rem', backgroundColor: 'lightgray', color: '#22478E', padding: '0.25rem', width: '100px', marginTop: '0.5rem' }}>Modificar</button></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Modelo de Tablet</td>
                            <td style={tableCellStyle}>{personalInfo.model}</td>
                            <td style={tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Versión software</td>
                            <td style={tableCellStyle}>{personalInfo.software}</td>
                            <td style={tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>País</td>
                            <td style={tableCellStyle}>{personalInfo.country}</td>
                            <td style={tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Navegación internet:</td>
                            <td style={tableCellStyle}>{personalInfo.internet}</td>
                            <td style={tableCellStyle}><button onClick={handleInternetNavigation} style={{borderRadius: '1rem', backgroundColor: 'red', color: 'white', padding: '0.25rem', width: '100px', marginTop: '0.5rem'}}>Desactivar</button></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Bloqueo remoto:</td>
                            <td style={tableCellStyle}>{personalInfo.blocked}</td>
                            <td style={tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Algoritmo de detección:</td>
                            <td style={tableCellStyle}>{personalInfo.detection}</td>
                            <td style={tableCellStyle}><button onClick={handleDetectionAlgorithm} style={{borderRadius: '1rem', backgroundColor: 'red', color: 'white', padding: '0.25rem', width: '100px', marginTop: '0.5rem'}}>Desactivar</button></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Detección de cyberbulling:</td>
                            <td style={tableCellStyle}>{personalInfo.cyberbulling}</td>
                            <td style={tableCellStyle}><button onClick={handleCyberbullying} style={{borderRadius: '1rem', backgroundColor: 'red', color: 'white', padding: '0.25rem', width: '100px', marginTop: '0.5rem'}}>Desactivar</button></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Ingreso a BD:</td>

                            <td style={tableCellStyle}>{personalInfo.bd}</td>
                            <td style={tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Última modificación:</td>
                            <td style={tableCellStyle}>{personalInfo.lastModification}</td>

                            <td style={tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Último envío de Stats:</td>
                            <td style={tableCellStyle}>{personalInfo.lastStats}</td>
                            <td style={tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Cumpleaños:</td>
                            <td style={tableCellStyle}>{personalInfo.birthday}</td>
                            <td style={tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Fabricante hardware:</td>
                            <td style={tableCellStyle}>{personalInfo.hardware}</td>
                            <td style={tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Brand de hardware:</td>
                            <td style={tableCellStyle}>{personalInfo.brandHardware}</td>
                            <td style={tableCellStyle}></td>
                        </tr>
                        <tr>
                            <td style={tableCellStyle}>Salud de la batería</td>
                            <td style={tableCellStyle}>{personalInfo.battery}</td>
                            <td style={tableCellStyle}></td>
                        </tr>

                    </tbody>
                </table>

            </div>
        </div>
    )
}