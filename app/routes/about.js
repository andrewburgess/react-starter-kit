export default function () {
    return {
        path: '/about',
        name: 'about',
        getComponent(location, cb) {
            return import('../containers/About')
            .then((module) => {
                cb(null, module.default);
            })
            .catch((err) => {
                console.error('Error loading component', err);
            });
        }
    };
}
