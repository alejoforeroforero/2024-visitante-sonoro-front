import PlanBox from "./components/PlanBox";

import styles from "./Plans.module.css";

const planesTituloEs = "ÚNETE A NUESTRA RED";
const planesDescEs =
  "Todos los más de 600 paisajes sonoros inmersivos que estamos seleccionando \
  están disponibles de forma completamente gratuita. Sin embargo, si deseas respaldar \
  nuestra continuidad y crecimiento Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
  Nunc convallis ligula pretium, accumsan mauris quis, pretium urna. Lorem ipsum dolor sit \
  amet, consectetur adipiscing elit. In hac habitasse platea dictumst. In hac habitasse \
  platea dictumst. Vestibulum dictum ante vel massa ultricies, eget tempus est facilisis";

const planes = [
  {
    id: 1,
    titulo: "Crowdfunding",
    beneficios: [
      "Con tu aporte podremos realizar más grabaciones.",
      "El aporte será destinado para los músicos y creadores de contenido",
    ],
  },
  {
    id: 2,
    titulo: "Catálogo",
    beneficios: [
      "Realiza compra del catálogo de grabaciones y apoya a nuestros artistas.",
    ],
  },
  {
    id: 3,
    titulo: "Miembro",
    beneficios: [
      "20% de descuento por compras en el catálogo",
      "Acceso a todas las grabaciones sin restricción",
      "creación de playlists",
      "Acceso a todos los artículos de investigación",
    ],
  },
];

const Plans = () => {
  return (
    <div className={styles.container}>
      <h1>{planesTituloEs}</h1>
      <p>{planesDescEs}</p>
      <section>
        {planes.map((plan) => {
          return (
            <PlanBox
              key={plan.id}
              title={plan.titulo}
              benefits={plan.beneficios}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Plans;
