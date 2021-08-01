import {
  EMAIL_REGEX,
  INVALID_MESSAGE_TYPE,
  PASSWORD_WHITESPACE_REGEX,
  USER_TYPES,
  VALIDATION_MESSAGES,
  REQUIRED_MESSAGE_TYPE,
  BETWEEN_MESSAGE_TYPE,
  NO_WHITESPACE_MESSAGE_TYPE,
  SAME_MESSAGE_TYPE,
  IN_MESSAGE_TYPE,
  DURAITON_REGEX,
  MAX_MESSAGE_TYPE,
  COURSE_TYPES,
  MIN_MESSAGE_TYPE,
} from "./app-constants";

const prepareValidationMessage = (messagePlaceholders, type) => {
  let strMsg = VALIDATION_MESSAGES[type];
  Object.keys(messagePlaceholders).map((key) => {
    let value = messagePlaceholders[key];
    if (![":min", ":max"].includes(key)) {
      value = messagePlaceholders[key].split("_").join(" ");
    }
    strMsg = strMsg.replace(key, value);
  });

  return strMsg;
};

const validateEmail = (state, value, fieldName) => {
  let isValid = true;
  const re = EMAIL_REGEX;
  const messagePlaceholders = {
    ":attribute": fieldName,
  };

  switch (true) {
    default: {
      if (value == "") {
        state.errors[fieldName] = prepareValidationMessage(
          messagePlaceholders,
          REQUIRED_MESSAGE_TYPE
        );
        isValid = false;
        break;
      }

      if (!re.test(value)) {
        state.errors[fieldName] = prepareValidationMessage(
          messagePlaceholders,
          INVALID_MESSAGE_TYPE
        );
        isValid = false;
        break;
      }
    }
  }

  if (isValid) state.errors[fieldName] = "";
  return isValid;
};

const validatePassword = (state, value, fieldName) => {
  let isValid = true;
  const regex = PASSWORD_WHITESPACE_REGEX;
  const messagePlaceholders = {
    ":attribute": fieldName,
  };

  switch (true) {
    default:
      if (value == "") {
        state.errors[fieldName] = prepareValidationMessage(
          messagePlaceholders,
          REQUIRED_MESSAGE_TYPE
        );
        isValid = false;
        break;
      }

      if (!regex.test(value)) {
        state.errors[fieldName] = prepareValidationMessage(
          messagePlaceholders,
          NO_WHITESPACE_MESSAGE_TYPE
        );
        isValid = false;
        break;
      }

      if (value.length < 6 || value.length > 14) {
        state.errors[fieldName] = prepareValidationMessage(
          { ...messagePlaceholders, ":min": 6, ":max": "14 characters" },
          BETWEEN_MESSAGE_TYPE
        );
        isValid = false;
        break;
      }
  }

  if (isValid) state.errors[fieldName] = "";

  return isValid;
};

const validateConfirmPassword = (state, value, password, fieldName) => {
  let isValid = true;
  const regex = PASSWORD_WHITESPACE_REGEX;
  const messagePlaceholders = {
    ":attribute": fieldName,
  };

  switch (true) {
    default: {
      if (value == "") {
        state.errors[fieldName] = prepareValidationMessage(
          messagePlaceholders,
          REQUIRED_MESSAGE_TYPE
        );
        isValid = false;
        break;
      }

      if (!regex.test(value)) {
        state.errors[fieldName] = prepareValidationMessage(
          messagePlaceholders,
          NO_WHITESPACE_MESSAGE_TYPE
        );
        isValid = false;
        break;
      }

      if (value != password) {
        state.errors[fieldName] = prepareValidationMessage(
          {
            ...messagePlaceholders,
            ":other": "password",
          },
          SAME_MESSAGE_TYPE
        );
        isValid = false;
        break;
      }
    }
  }

  if (isValid) state.errors[fieldName] = "";
  return isValid;
};

const validateUserType = (state, value, fieldName) => {
  let isValid = true;
  const messagePlaceholders = {
    ":attribute": fieldName,
  };

  switch (true) {
    default: {
      if (value == "") {
        state.errors[fieldName] = prepareValidationMessage(
          messagePlaceholders,
          REQUIRED_MESSAGE_TYPE
        );
        isValid = false;
        break;
      }

      if (!USER_TYPES.includes(value)) {
        state.errors[fieldName] = prepareValidationMessage(
          {
            ...messagePlaceholders,
            ":values": USER_TYPES.join(", "),
          },
          IN_MESSAGE_TYPE
        );
        isValid = false;
        break;
      }
    }
  }

  if (isValid) state.errors[fieldName] = "";
  return isValid;
};

const validateFirstName = (state, value, fieldName) => {
  let isValid = true;
  const messagePlaceholders = {
    ":attribute": fieldName,
  };

  switch (true) {
    default: {
      if (value == "") {
        state.errors[fieldName] = prepareValidationMessage(
          messagePlaceholders,
          REQUIRED_MESSAGE_TYPE
        );
        isValid = false;
        break;
      }

      if (!isNaN(value)) {
        state.errors[fieldName] = prepareValidationMessage(
          messagePlaceholders,
          INVALID_MESSAGE_TYPE
        );
        isValid = false;
        break;
      }
    }
  }

  if (isValid) state.errors[fieldName] = "";
  return isValid;
};

const validateLastName = (state, value, fieldName) => {
  let isValid = true;
  const messagePlaceholders = {
    ":attribute": fieldName,
  };

  switch (true) {
    default: {
      if (value == "") {
        state.errors[fieldName] = prepareValidationMessage(
          messagePlaceholders,
          REQUIRED_MESSAGE_TYPE
        );
        isValid = false;
        break;
      }

      if (!isNaN(value)) {
        state.errors[fieldName] = prepareValidationMessage(
          messagePlaceholders,
          INVALID_MESSAGE_TYPE
        );
        isValid = false;
        break;
      }
    }
  }

  if (isValid) state.errors[fieldName] = "";
  return isValid;
};

const validateCourseDuration = (state, value, fieldName) => {
  let isValid = true;
  const re = DURAITON_REGEX;
  const messagePlaceholders = {
    ":attribute": fieldName,
  };

  switch (true) {
    default: {
      if (value == "") {
        state.errors[fieldName] = prepareValidationMessage(
          messagePlaceholders,
          REQUIRED_MESSAGE_TYPE
        );
      }

      if (!re.test(value)) {
        state.errors[fieldName] = prepareValidationMessage(
          messagePlaceholders,
          INVALID_MESSAGE_TYPE
        );
        isValid = false;
      }

      if (value < 1 || value > 12) {
        state.errors[fieldName] = prepareValidationMessage(
          {
            ...messagePlaceholders,
            ":max": "12 Months",
            ":min": "1",
          },
          BETWEEN_MESSAGE_TYPE
        );
        isValid = false;
      }
    }
  }

  if (isValid) state.errors[fieldName] = "";
  return isValid;
};

const validateCourseName = (state, value, fieldName) => {
  let isValid = true;
  const messagePlaceholders = {
    ":attribute": fieldName,
  };

  switch (true) {
    default: {
      if (value == "") {
        state.errors[fieldName] = prepareValidationMessage(
          messagePlaceholders,
          REQUIRED_MESSAGE_TYPE
        );
        isValid = false;
        break;
      }

      if (value.length > 100) {
        state.errors[fieldName] = prepareValidationMessage(
          {
            ...messagePlaceholders,
            ":max": "200 Characters",
          },
          MAX_MESSAGE_TYPE
        );
        isValid = false;
        break;
      } else if (value.length < 5) {
        state.errors[fieldName] = prepareValidationMessage(
          {
            ...messagePlaceholders,
            ":min": "5 characters",
          },
          MIN_MESSAGE_TYPE
        );
        isValid = false;
        break;
      }
    }
  }

  if (isValid) state.errors[fieldName] = "";
  return isValid;
};

const validateCoursePrerequisites = (state, value, fieldName) => {
  let isValid = true;
  const messagePlaceholders = {
    ":attribute": fieldName,
  };

  switch (true) {
    default: {
      if (value == "") {
        state.errors[fieldName] = prepareValidationMessage(
          messagePlaceholders,
          REQUIRED_MESSAGE_TYPE
        );
        isValid = false;
        break;
      }

      if (value.length > 200) {
        state.errors[fieldName] = prepareValidationMessage(
          {
            ...messagePlaceholders,
            ":max": "200 characters",
          },
          MAX_MESSAGE_TYPE
        );
        isValid = false;
        break;
      }
    }
  }

  if (isValid) state.errors[fieldName] = "";
  return isValid;
};

const validateCourseType = (state, value, fieldName) => {
  let isValid = true;
  const messagePlaceholders = {
    ":attribute": fieldName,
  };

  switch (true) {
    default: {
      if (value == "") {
        state.errors[fieldName] = prepareValidationMessage(
          messagePlaceholders,
          REQUIRED_MESSAGE_TYPE
        );
        isValid = false;
        break;
      }

      if (!COURSE_TYPES.includes(value)) {
        state.errors[fieldName] = prepareValidationMessage(
          {
            ...messagePlaceholders,
            ":values": COURSE_TYPES.join(", "),
          },
          IN_MESSAGE_TYPE
        );
        isValid = false;
        break;
      }
    }
  }

  if (isValid) state.errors[fieldName] = "";
  return isValid;
};

export {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateUserType,
  validateFirstName,
  validateLastName,
  validateCourseName,
  validateCourseDuration,
  validateCoursePrerequisites,
  validateCourseType,
};
