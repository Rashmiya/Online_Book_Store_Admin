import PropTypes from "prop-types";
import { useMemo } from "react";

const UserColorProfile = ({ color, name, size, textSize, onClick }) => {
  const initials = useMemo(() => {
    if (name.trim() === "") {
      return "";
    }

    const nameParts = name.split(" ");
    const firstInitial = nameParts[0][0];
    const secondInitial = nameParts.length > 1 ? nameParts[1][0] : "";

    return firstInitial + secondInitial;
  });
  return (
    <div
      style={{
        backgroundColor: `${color}`,
        fontSize: `${textSize}`,
        width: `${size}`,
        height: `${size}`,
      }}
      onClick={onClick}
      className="flex p-1 rounded-full items-center justify-center page-subtitle bg-primary uppercase cursor-pointer"
    >
      {initials}
    </div>
  );
};

export default UserColorProfile;

UserColorProfile.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  textSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
