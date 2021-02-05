import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import HomeIcon from '@material-ui/icons/Home';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import StorefrontIcon from '@material-ui/icons/Storefront';


export interface FirstGroup {
    name: string;
    route: string;
    exact: boolean;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

export interface RootObject {
    firstGroup: FirstGroup[];
    secondGroup: FirstGroup[];
}


export const drawerRoutes: RootObject = {
    firstGroup: [
        {
            name: "Home",
            route: "/",
            exact: true,
            icon: StorefrontIcon
        },
        {
            name: "Competitions",
            route: "/competitions",
            exact: true,
            icon: SportsKabaddiIcon
        },
        {
            name: "Clubs",
            route: "/clubs",
            exact: true,
            icon: HomeIcon
        },
        {
            name: "Results",
            route: "/results",
            exact: true,
            icon: EqualizerIcon
        }
    ],
    secondGroup: [

    ]
}