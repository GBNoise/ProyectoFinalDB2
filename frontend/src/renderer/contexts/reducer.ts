import { ServerResponse } from 'renderer/types/types';

interface InitialState {
  isLoading: boolean;
  isModalOpen: boolean;
  modalAction: string;
  currentData: ServerResponse;
  updateFields: object;
  references: object;
  currentID: object;
  dependencies: object;
}

export const initialState: InitialState = {
  isLoading: false,
  isModalOpen: false,
  modalAction: '',
  currentData: {
    message: '',
    object: { columns: [], rows: [], from: '' },
    statusCode: 0,
  },
  updateFields: {},
  references: {},
  currentID: {},
  dependencies: {},
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'open modal':
      if (action.payload.action === 'update')
        return {
          ...state,
          isModalOpen: true,
          modalAction: action.payload.action,
          updateFields: action.payload.update,
        };
      return { ...state, isModalOpen: true, modalAction: action.payload };

    case 'close modal':
      return { ...state, isModalOpen: false };

    case 'modal action create':
      return { ...state, modalAction: 'create' };

    case 'modal action delete':
      return { ...state, modalAction: 'delete' };

    case 'modal action update':
      return { ...state, modalAction: 'update' };

    case 'setCurrentData':
      return { ...state, currentData: action.payload };

    case 'setUpdateFields':
      return { ...state, updateFields: action.payload };

    case 'setReferences':
      return { ...state, references: { ...action.payload } };

    case 'setCurrentID':
      return { ...state, currentID: action.payload };

    case 'dismiss currentID':
      return { ...state, currentID: {} };

    case 'setDependencies':
      return {
        ...state,
        dependencies: { ...state.dependencies, ...action.payload },
      };

    case 'dismiss dependencies':
      return { ...state, dependencies: {} };
  }
};
