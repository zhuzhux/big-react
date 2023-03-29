import { Action } from 'shared/ReactTypes';

export interface Update<State> {
	action: Action<State>;
}

export interface UpdateQueue<State> {
	shared: {
		pending: Update<State> | null;
	};
}

// Update 实例方法
export const createUpdate = <State>(action: Action<State>): Update<State> => {
	return {
		action
	};
};

// UpdateQueue 实例方法
export const createUpdateQueue = <Action>() => {
	return {
		shared: {
			pending: null
		}
	} as UpdateQueue<Action>;
};

// 将update插入到updateQueue
export const enqueueUpdate = <Action>(
	updateQueue: UpdateQueue<Action>,
	update: Update<Action>
) => {
	updateQueue.shared.pending = update;
};

// 消费update
export const processUpdateQueue = <State>(
	baseState: State,
	pendingUpdate: Update<State> | null
): { memoizedState: State } => {
	const result: ReturnType<typeof processUpdateQueue<State>> = {
		memoizedState: baseState
	};
	if (pendingUpdate !== null) {
		const action = pendingUpdate.action;
		if (action instanceof Function) {
			// baseState 1 update 2 -> memoizedState 2
			result.memoizedState = action(baseState);
		} else {
			// baseState 1 update (x) => 4x -> memorizedState 4
			result.memoizedState = action;
		}
	}
	return result;
};
