import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import HomeIcon from '@material-ui/icons/Home';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import StorefrontIcon from '@material-ui/icons/Storefront';


export interface RouteObjectInterface {
    name: string;
    route: string;
    private: boolean;
    exact: boolean;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

export interface RootObject {
    firstGroup: RouteObjectInterface[];
    secondGroup: RouteObjectInterface[];
}


export const drawerRoutes: RootObject = {
    firstGroup: [
        {
            name: "Home",
            route: "/",
            exact: true,
            private: false,
            icon: StorefrontIcon
        },
        {
            name: "Competitions",
            route: "/competitions",
            exact: true,
            private: false,
            icon: SportsKabaddiIcon
        },
        {
            name: "Clubs",
            route: "/clubs",
            exact: true,
            private: false,
            icon: HomeIcon
        },
        {
            name: "Results",
            route: "/results",
            exact: true,
            private: false,
            icon: EqualizerIcon
        }
    ],
    secondGroup: [
       
    ]
}