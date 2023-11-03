import React from "react";
import MyanmarCalendar2 from "@/components/MyanmarCalendar2";
import {Provider} from "react-redux";
import {store} from "@/store";
import AppSetupProvider from "@/components/providers/AppSetupProvider";
import {Analytics} from "@vercel/analytics/react";

// document.documentElement.classList.add('dark')
const Home = () => {
    return (
        <>
            <Analytics/>
            <Provider store={store}>
                <AppSetupProvider>
                    <MyanmarCalendar2/>
                </AppSetupProvider>
            </Provider>
        </>
    );
};

export default Home;
