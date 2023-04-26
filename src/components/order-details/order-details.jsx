import styles from "./order-details.module.css";
import imageCheck from "../../images/done.png";
import PropTypes from "prop-types";
import cn from "classnames";

function OrderDetails({ checkOutData }) {
  return (
    <div className={styles.box}>
      <span className={cn("text", "text_type_digits-large", "pt-10")}>
        {checkOutData.order.number}
      </span>
      <p className={cn("pt-8", "pb-15", "text", "text_type_main-medium")}>
        идентификатор заказа
      </p>

      <img className="pb-15" src={imageCheck} alt="галочка" />

      <p className={cn("text", "text_type_main-default", "pb-2")}>
        Ваш заказ начали готовить
      </p>
      <p
        className={cn(
          "text",
          "text_type_main-default",
          "text_color_inactive",
          "pb-15"
        )}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

// OrderDetails.propTypes = {
//     orderData: PropTypes.shape({
//       number: PropTypes.string.isRequired,
//       ingredients: PropTypes.arrayOf(PropTypes.shape({
//         _id: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//         type: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         image: PropTypes.string.isRequired,
//         count: PropTypes.number.isRequired
//       })).isRequired,
//       createdAt: PropTypes.string.isRequired,
//     }).isRequired
//   }

export default OrderDetails;
