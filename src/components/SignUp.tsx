import { Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import Text from "./Text";
import TextInput from "./TextInput";
import { Values } from "../../types";
import theme from "../theme";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import useSignUp from "../hooks/useSignUp";
import { ApolloError } from "@apollo/client";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    flexGrow: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    backgroundColor: "white",
  },
  textBlueBoxItem: {
    padding: 10,
    borderColor: theme.colors.primary,
    borderRadius: 2,
    marginTop: 10,
    flexGrow: 0,
    backgroundColor: theme.colors.primary,
    width: 300,
    marginBottom: 10,
  },
  textErrorItem: {
    color: theme.colors.red,
    alignSelf: "flex-start",
    marginLeft: 40,
  },
  textCenteredItem: {
    alignSelf: "center",
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters long")
    .max(30, "Username must be at most 30 characters long")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters long")
    .max(30, "Password must be at most 30 characters long")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Password and password confirmation must match"
    )
    .required("Password confirmation is required"),
});

interface signUpFormProps {
  onSubmit: (values: Values) => void;
  error: string;
}

interface signUpContainerProps {
  onSubmit: (values: Values) => Promise<void>;
  error: string;
}

const SignInForm = ({ onSubmit, error }: signUpFormProps) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.flexContainer}>
      <TextInput
        error={formik.touched.username && formik.errors.username ? true : false}
        options={{
          placeholder: "Username",
          value: formik.values.username,
          onChangeText: formik.handleChange("username"),
        }}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.textErrorItem}>{formik.errors.username}</Text>
      )}
      <TextInput
        error={formik.touched.password && formik.errors.password ? true : false}
        options={{
          placeholder: "Password",
          value: formik.values.password,
          onChangeText: formik.handleChange("password"),
          secureTextEntry: true,
        }}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.textErrorItem}>{formik.errors.password}</Text>
      )}
      <TextInput
        error={
          formik.touched.passwordConfirmation &&
          formik.errors.passwordConfirmation
            ? true
            : false
        }
        options={{
          placeholder: "Password confirmation",
          value: formik.values.passwordConfirmation,
          onChangeText: formik.handleChange("passwordConfirmation"),
          secureTextEntry: true,
        }}
      />
      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text style={styles.textErrorItem}>
            {formik.errors.passwordConfirmation}
          </Text>
        )}
      <Pressable
        onPress={() => formik.handleSubmit()}
        style={styles.textBlueBoxItem}
      >
        <Text color="white" style={styles.textCenteredItem}>
          Sign Up
        </Text>
      </Pressable>
      {error && <Text style={styles.textErrorItem}>{error}</Text>}
    </View>
  );
};

export const SignInContainer = ({ onSubmit, error }: signUpContainerProps) => {
  return <SignInForm onSubmit={onSubmit} error={error} />;
};

const SignUp = () => {
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const onSubmit = async (values: Values) => {
    const { username, password, passwordConfirmation } = values;
    if (password === passwordConfirmation) {
      try {
        await signUp({ username, password });
        await signIn({ username, password });
        navigate("/");
      } catch (e) {
        if (e instanceof ApolloError && typeof e.message === "string") {
          setError(e.message);
          setTimeout(() => {
            setError("");
          }, 5000);
        }
        console.log(e);
      }
    } else {
      setError("Password and password confirmation must match");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return <SignInContainer onSubmit={onSubmit} error={error} />;
};

export default SignUp;
