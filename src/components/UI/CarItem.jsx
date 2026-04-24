

// export default CarItem;
import { Link } from "react-router-dom";

// Component with inline styles
const CarItem = (props) => {
  const { imgUrl, model, carName, automatic, speed, price } = props.item;

  // Inline styles
  const styles = {
    carItem: {
      border: "1px solid #e9e9e9",
      padding: "20px",
      borderRadius: "5px",
      background: "white",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
      transition: "all 0.3s"
    },
    carImg: {
      width: "100%",
      height: "200px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px"
    },
    carImage: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain"
    },
    carName: {
      fontSize: "24px",
      color: "#198754",
      fontWeight: "700",
      textAlign: "center",
      marginBottom: "10px"
    },
    rentPrice: {
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "#198754",
      textAlign: "center",
      marginBottom: "15px"
    },
    priceSpan: {
      color: "#777",
      fontSize: "0.9rem",
      fontWeight: "400"
    },
    carItemInfo: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderTop: "1px solid #e9e9e9",
      paddingTop: "15px",
      marginBottom: "20px"
    },
    infoSpan: {
      display: "flex",
      alignItems: "center",
      columnGap: "4px",
      color: "#777",
      fontSize: "14px"
    },
    icon: {
      color: "#198754",
      fontSize: "16px",
      marginRight: "5px"
    },
    carItemBtn: {
      display: "flex",
      marginTop: "auto",
      borderRadius: "5px",
      overflow: "hidden"
    },
    rentBtn: {
      width: "50%",
      border: "none",
      outline: "none",
      padding: "8px 0",
      background: "#198754",
      transition: "all 0.3s"
    },
    detailsBtn: {
      width: "50%",
      border: "none",
      outline: "none",
      padding: "8px 0",
      background: "#f9a826",
      transition: "all 0.3s"
    },
    btnLink: {
      textDecoration: "none",
      color: "white",
      fontWeight: "500",
      display: "block"
    }
  };

  return (
    <div 
      style={styles.carItem} 
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
        e.currentTarget.style.transform = "translateY(-5px)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.05)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={styles.carImg}>
        <img src={imgUrl} alt={carName} style={styles.carImage} loading="lazy" />
      </div>

      <h4 style={styles.carName}>{carName}</h4>
      <h6 style={styles.rentPrice}>
        ${price}.00 <span style={styles.priceSpan}>/ Day</span>
      </h6>

      <div style={styles.carItemInfo}>
        <span style={styles.infoSpan}>
          <i className="ri-car-line" style={styles.icon}></i> {model}
        </span>
        <span style={styles.infoSpan}>
          <i className="ri-settings-2-line" style={styles.icon}></i> {automatic}
        </span>
        <span style={styles.infoSpan}>
          <i className="ri-timer-flash-line" style={styles.icon}></i> {speed}
        </span>
      </div>

      <div style={styles.carItemBtn}>
        <button 
          style={styles.rentBtn}
          onMouseOver={(e) => e.currentTarget.style.opacity = "0.9"}
          onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
        >
          <Link to={`/cars/${carName}`} style={styles.btnLink}>Rent</Link>
        </button>
        <button 
          style={styles.detailsBtn}
          onMouseOver={(e) => e.currentTarget.style.opacity = "0.9"}
          onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
        >
          <Link to={`/cars/${carName}`} style={styles.btnLink}>Details</Link>
        </button>
      </div>
    </div>
  );
};

export default CarItem;