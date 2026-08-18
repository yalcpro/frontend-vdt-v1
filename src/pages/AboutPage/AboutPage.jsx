import styles from './AboutPage.module.css'

export default function AboutPage() {
  return (
    <div className={`${styles.container} glass`}>
      <h1>Sobre Venta de to'</h1>
      <p>
        Somos un negocio dedicado a ofrecer productos físicos y servicios digitales 
        como recargas móviles, reparación de software, entrega de aplicaciones premium 
        y mucho más. Trabajamos con seriedad y rapidez.
      </p>
      <p>
        Contáctanos por WhatsApp para cualquier consulta o pedido. 
        ¡Gracias por confiar en nosotros!
      </p>
    </div>
  )
}