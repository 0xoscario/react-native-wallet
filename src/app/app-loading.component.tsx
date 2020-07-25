/**
 * @format
 */
import React from 'react';
import { useDispatch } from 'react-redux';
import { NativeModules } from 'react-native';

type TaskResult = [string, any];
export type Task = (dispatch: any) => Promise<TaskResult | null>;

export interface ApplicationLoaderProps {
  tasks?: Task[];
  initialConfig?: Record<string, any>;
  children: (config: any) => React.ReactElement;
};

export const AppLoading = (props: ApplicationLoaderProps): React.ReactElement => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const loadingResult = props.initialConfig || {};

  const onTasksFinish = (): void => {
    setLoading(false);
  };

  React.useEffect(() => {
    if (loading) {
      startTasks().then(onTasksFinish);
    }
  }, [loading]);

  const saveTaskResult = (result: [string, any] | null): void => {
    if (result) {
      loadingResult[result[0]] = result[1];
    }
  };

  const createRunnableTask = async (task: Task): Promise<void> => {
    return task(dispatch).then(saveTaskResult);
  };

  const startTasks = async (): Promise<any> => {
    if (props.tasks) {
      return Promise.all(props.tasks.map(createRunnableTask));
    }
    return Promise.resolve();
  };

  if (!loading) {
    NativeModules.SplashScreen.close({
      animationType: 2,
      duration: 500,
    });
  }

  return (
    <>
      {!loading && props.children(loadingResult)}
    </>
  );
};
