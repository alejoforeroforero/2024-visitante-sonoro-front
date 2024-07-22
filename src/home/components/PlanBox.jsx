
import styles from './PlanBox.module.css';
const PlanBox = ({title, benefits}) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <hr />
      {benefits.map((benefit, index) =>{
        return <p key={index}>{benefit}</p>
      })}
      
    </div>
  )
}

export default PlanBox
