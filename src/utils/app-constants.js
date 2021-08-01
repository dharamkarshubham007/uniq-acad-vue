export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
export const PASSWORD_WHITESPACE_REGEX = /^\S*$/;
export const DURAITON_REGEX = /^\d+$/;

export const USER_TYPES = ["instructor", "student"];
export const COURSE_TYPES = ["ui", "ux", "backend", "other"];

export const REQUIRED_MESSAGE_TYPE = "required";
export const BETWEEN_MESSAGE_TYPE = "between";
export const SAME_MESSAGE_TYPE = "same";
export const NO_WHITESPACE_MESSAGE_TYPE = "no_whitesapce";
export const INVALID_MESSAGE_TYPE = "invalid";
export const IN_MESSAGE_TYPE = "in";
export const MAX_MESSAGE_TYPE = "max";
export const MIN_MESSAGE_TYPE = "min";

export const VALIDATION_MESSAGES = {
  [REQUIRED_MESSAGE_TYPE]: "The :attribute field is required",
  [BETWEEN_MESSAGE_TYPE]: "The :attribute must be in between :min to :max",
  [SAME_MESSAGE_TYPE]: "The :attribute and :other must match.",
  [NO_WHITESPACE_MESSAGE_TYPE]: "The :attribute must not contain whitespaces",
  [INVALID_MESSAGE_TYPE]: "Please enter valid :attribute",
  [IN_MESSAGE_TYPE]:
    "The :attribute must be one of the following types: :values",
  [MAX_MESSAGE_TYPE]: "The :attribute can't be greater than :max",
  [MIN_MESSAGE_TYPE]: "The :attribute can't be less than :min",
};

export const LOGOUT_SUCCESS = "Logged out successfully!!";
export const WELCOME_HOME_SUCCESS = "Welcome back!!";
export const COURSE_CREATED_SUCCESS = "Course created successfully!!";
