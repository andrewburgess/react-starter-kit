export default function () {
    return {
        name: 'home',
        getComponent(location, cb) {
            return import('../containers/Home')
            .then((component) => {
                cb(null, component.default);
            })
            .catch((err) => {
                console.error('Error loading component', err);
            });
        }
    };
}
