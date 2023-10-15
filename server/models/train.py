import pandas as pd
# import numpy as np
# from keras.layers import LSTM, Dense
# from sklearn.model_selection import TimeSeriesSplit
# from sklearn.metrics import mean_squared_error, mean_absolute_error
# from sklearn.preprocessing import MinMaxScaler
# from keras.models import Sequential
# from keras.layers import Dense
# from keras.layers import LSTM
import yfinance as yf
# import math

INTERVAL = "1d"
PERIOD = "1y"


def pull_data(stock: str) -> pd.DataFrame:
    df = yf.Ticker(stock).history(interval=INTERVAL, period=PERIOD)
    return df


# def create_data_sets(
#     df: pd.DataFrame,
# ) -> tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray, np.ndarray]:
#     # Output and Input features
#     output = pd.DataFrame(df["Open"])
#     features = ["Open"]

#     # Create feature transformer
#     scaler = MinMaxScaler()
#     feature_transform = scaler.fit_transform(df[features])
#     feature_transform = pd.DataFrame(
#         columns=features, data=feature_transform, index=df.index
#     )

#     timesplit = TimeSeriesSplit(n_splits=10)
#     for train_index, test_index in timesplit.split(feature_transform):
#         X_train, X_test = (
#             feature_transform[: len(train_index)],
#             feature_transform[len(train_index) : (len(train_index) + len(test_index))],
#         )
#         y_train, y_test = (
#             output[: len(train_index)].values.ravel(),
#             output[
#                 len(train_index) : (len(train_index) + len(test_index))
#             ].values.ravel(),
#         )

#     X_train_arr = np.array(X_train)
#     X_test_arr = np.array(X_test)
#     X_train = X_train_arr.reshape(X_train.shape[0], 1, X_train.shape[1])
#     X_test = X_test_arr.reshape(X_test.shape[0], 1, X_test.shape[1])

#     return X_train, X_test, y_train, y_test, X_train_arr


# def create_model(X_train_arr: np.ndarray) -> Sequential:
#     lstm = Sequential()
#     lstm.add(
#         LSTM(
#             32,
#             input_shape=(1, X_train_arr.shape[1]),
#             activation="relu",
#             return_sequences=False,
#         )
#     )
#     lstm.add(Dense(1))
#     lstm.compile(loss="mean_squared_error", optimizer="adam")
#     return lstm


# def analysis(y_test: np.ndarray, y_pred: np.ndarray):
#     mse = mean_squared_error(y_test, y_pred)
#     print("MSE: " + str(mse))
#     mae = mean_absolute_error(y_test, y_pred)
#     print("MAE: " + str(mae))
#     rmse = math.sqrt(mean_squared_error(y_test, y_pred))
#     print("RMSE: " + str(rmse))
#     mape = np.mean(np.abs(y_pred - y_test) / np.abs(y_test))
#     print("MAPE: " + str(mape))


# def save_model(model: Sequential, stock: str):
#     model.save("trained/" + stock + ".h5")


# def train(stock: str):
#     # Pull data
#     df = pull_data(stock)

#     # Create data sets
#     X_train, X_test, y_train, y_test, X_train_arr = create_data_sets(df)

#     # Create model
#     lstm = create_model(X_train_arr)

#     # Train model
#     lstm.fit(X_train, y_train, epochs=100, batch_size=8, verbose=1, shuffle=False)

#     # Predict
#     y_pred = lstm.predict(X_test)

#     # Analysis
#     analysis(y_test, y_pred)

#     # Save model
#     save_model(lstm, stock)


# def train_all():
#     # TODO
#     pass


# if __name__ == "__main__":
#     # train_all()
#     train("AAPL")
