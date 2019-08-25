import { APP_KEY } from '~/modules/app/data/constants';
import { AppState } from '~/modules/app/data/models';

export const appStateSelector = (state: { [APP_KEY]: AppState }): AppState => ({
    ...state[APP_KEY],
});
