import React from "react";
import MyanmarCalendar2 from "@/components/MyanmarCalendar2";
import {Provider} from "react-redux";
import {store} from "@/store";
import AppSetupProvider from "@/components/providers/AppSetupProvider";
import {Analytics} from "@vercel/analytics/react";
import ReloadPrompt from "@/components/ReloadPrompt";
import {Toaster} from "sonner";


const Home = () => {
    const date = '__DATE__';
    console.log(date)
    return (
        <>
            <Analytics/>
            <Provider store={store}>
                <AppSetupProvider>
                    <MyanmarCalendar2/>
                </AppSetupProvider>
            </Provider>
            <Toaster/>
            <ReloadPrompt/>
        </>
    );
};

export default Home;
