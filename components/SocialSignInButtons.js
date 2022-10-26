import React from 'react';
import CustomButton from "./CustomButton";

export default function SocialSignInButtons() {
    const onSignInWithFacebook = () => {
        console.warn("Sign In 1");
    }

    const onSignInWithGoogle = () => {
        console.warn("Sign In 2");
    }

    const onSignInWithApple = () => {
        console.warn("Sign In 3");
    }

    return (
        <>
            <CustomButton
                title="Sign In with FaceBook"
                onPress={onSignInWithFacebook}
                backgroundColor="#E7EAF4"
                foregroundColor="#4765A9"/>
            <CustomButton
                title="Sign In with Google"
                onPress={onSignInWithGoogle}
                backgroundColor="#FAE9EA"
                foregroundColor="#DD4D44"/>
            <CustomButton
                title="Sign In with Apple"
                onPress={onSignInWithApple}
                backgroundColor="#E3E3E3"
                foregroundColor="#363636"/>
        </>
    )
}