import { Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import Text from "./Text";
import TextInput from "./TextInput";
import { Values } from "../../types";
import theme from "../theme";
import * as yup from "yup";

const initialValues = {
  username: "",
  password: "",
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
  },
  textCenteredItem: {
    alignSelf: "center",
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters long")
    .required("Username is required"),
  password: yup
    .string()
    .min(3, "Password must be at least 3 characters long")
    .required("Password is required"),
});

const SignInForm = ({ onSubmit }: { onSubmit: (values: Values) => void }) => {
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
      {/* @ts-ignore */}
      <Pressable onPress={formik.handleSubmit} style={styles.textBlueBoxItem}>
        <Text color="white" style={styles.textCenteredItem}>
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values: Values) => {
    console.log(values);
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
