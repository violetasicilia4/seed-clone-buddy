// Mini interfaces de producto para las tarjetas de funcionalidades.
// Todo se dimensiona con unidades de contenedor (cqw), así escala igual en cualquier ancho.

function Tick() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function GiftMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mui">
        <span className="mui-chip">+ $50.000 nuevo aporte</span>
        <div className="mui-label">Luna de miel</div>
        <div className="mui-amount">$1.360.000</div>
        <div className="mui-sub">de $2.000.000</div>
        <div className="mui-bar"><i style={{ width: "68%" }} /></div>
        <div className="mui-row"><span>68%</span><span className="muted">34 aportes</span></div>
      </div>
    </div>
  );
}

function Guest({ name, flip = false }: { name: string; flip?: boolean }) {
  return (
    <div className="mui-guest">
      <span>{name}</span>
      <span className={`st${flip ? " flip" : ""}`}>
        {flip && <span className="pend">Pendiente<i className="ring" /></span>}
        <span className="tick"><Tick /></span>
      </span>
    </div>
  );
}

export function GuestsMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mui">
        <div className="mui-head">
          <span className="mui-count">
            <span className="a">64</span>
            <span className="b">65</span>
          </span>
          <em>/ 86</em>
          <span className="muted mui-head-label">confirmados</span>
        </div>
        <Guest name="Camila Rodríguez" />
        <Guest name="Lucas Benítez" />
        <Guest name="Valentina Morales" flip />
      </div>
    </div>
  );
}

export function SiteMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mui mui-site">
        <div className="mui-top"><i /><i /><i /></div>
        <div className="mui-landing">
          <div className="mui-date">24 · 10 · 2026</div>
          <div className="mui-names">Milagros &amp; Juan</div>
          <span className="mui-btn">
            <span className="off">Confirmar asistencia</span>
            <span className="on">Asistencia confirmada</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function PanelMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mui">
        <div className="mui-label">Organización completada</div>
        <div className="mui-amount">74%</div>
        <div className="mui-bar"><i style={{ width: "74%" }} /></div>
        <div className="mui-metric"><span className="muted">Invitados</span><b>86</b></div>
        <div className="mui-metric"><span className="muted">Confirmados</span><b>64</b></div>
        <div className="mui-metric"><span className="muted">Regalos recibidos</span><b>$1.360.000</b></div>
      </div>
    </div>
  );
}
