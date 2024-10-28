export enum Routes {
    Login = '/login',
    Register = '/register',
    Artists = '/artists',
    Favourites = '/favourites',
}

export const RouteTitles: { [key in Routes]: string } = {
    [Routes.Login]: 'Sign In',
    [Routes.Register]: 'Sign Up',
    [Routes.Artists]: 'Artists',
    [Routes.Favourites]: 'Favourites',
};
