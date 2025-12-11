from matplotlib.pyplot import axis
import pandas as pd
import numpy as np
from sklearn.model_selection import StratifiedShuffleSplit
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import root_mean_squared_error
from sklearn.model_selection import cross_val_score

# 1. Load the dataset
housing = pd.read_csv('housing.csv')

# 2. Create a stratified test set
housing['income_cat'] = pd.cut(housing["median_income"],
                        bins=[0.0, 1.5, 3.0, 4.5, 6.0, np.inf],
                        labels=[1,2,3,4,5])

split = StratifiedShuffleSplit(n_splits=1, test_size=0.2, random_state=42)

for train_index, test_index in split.split(housing, housing['income_cat']):
    strat_train_set = housing.loc[train_index].drop("income_cat", axis=1)
    strat_test_set = housing.loc[test_index].drop("income_cat", axis=1)

# We will work on the copy of training data
housing = strat_train_set.copy()

# 3. Seperate features and labels
housing_lables = housing["median_house_value"].copy()
housing = housing.drop("median_house_value", axis=1)

# print(housing, housing_lables)

# 4. List numerical and categorical columns
num_attribs = housing.drop("ocean_proximity", axis=1).columns.tolist()
cat_attribs = ["ocean_proximity"]

# 5. Lets make the pipeline 
# for Numeric Colum
num_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])

# for Numeric Colum
cat_pipeline = Pipeline([
    ("onehot", OneHotEncoder(handle_unknown="ignore"))
])

# Construct the full pipeline
full_pipeline = ColumnTransformer([
    ("num", num_pipeline, num_attribs),
    ("cat", cat_pipeline, cat_attribs)
])

# 6. Transform the data
housing_prepared = full_pipeline.fit_transform(housing)
print(housing_prepared.shape)

# 7. Train the model

# Linear Regration Model
lin_reg = LinearRegression()
lin_reg.fit(housing_prepared, housing_lables)
lin_preds = lin_reg.predict(housing_prepared)
lin_rmse = root_mean_squared_error(housing_lables, lin_preds)
print(f"The Root mean Squade error for Linear Regration us {lin_rmse}")

# Decision Regration Model
dec_reg = DecisionTreeRegressor()
dec_reg.fit(housing_prepared, housing_lables)
dec_preds = lin_reg.predict(housing_prepared)
dec_rmse = root_mean_squared_error(housing_lables, dec_preds)
dec_rmses = -cross_val_score(dec_reg, housing_prepared, housing_lables, scoring="neg_root_mean_squared_error", cv=10)
print(f"The Root mean Squade error for Decision Regration us {dec_rmse}")
# print(pd.Series(dec_rmses).describe())

# RandomForest Regration Model
rand_reg = RandomForestRegressor()
rand_reg.fit(housing_prepared, housing_lables)
rand_preds = rand_reg.predict(housing_prepared)
rand_rmse = root_mean_squared_error(housing_lables, rand_preds)
print(f"The Root mean Squade error for RandomForest Regration us {rand_rmse}")

rand_rmses = -cross_val_score(rand_reg, housing_prepared, housing_lables, scoring="neg_root_mean_squared_error", cv=10)
print(pd.Series(rand_rmses).describe())
