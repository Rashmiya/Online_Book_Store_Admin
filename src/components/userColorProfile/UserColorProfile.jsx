import PropTypes from "prop-types";
import { useMemo } from "react";

const UserColorProfile = ({ color, name, size, textSize }) => {
  const initials = useMemo(() => {
    const nameParts = name?.split(" ");
    const firstLetter = nameParts[0][0];
    const secondLetter = nameParts[1] ? nameParts[1][0] : "";
    return firstLetter + secondLetter;
  }, [name]);

  return (
    <div
      style={{
        backgroundColor: `${color}`,
        fontSize: `${textSize}`,
        width: `${size}`,
        height: `${size}`,
      }}
      className="page-subtitle flex items-center justify-center rounded-full bg-primary p-1 uppercase"
    >
      {initials}
    </div>
  );
};

export default UserColorProfile;

UserColorProfile.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  textSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
