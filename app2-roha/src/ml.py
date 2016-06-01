import matplotlib.pyplot as plt
import numpy as np
from sklearn import datasets, linear_model

from time import time
import matplotlib.pyplot as plt

from sklearn import metrics
from sklearn.cluster import KMeans
from sklearn.datasets import load_digits
from sklearn.decomposition import PCA
from sklearn.preprocessing import scale
sample_size = 300

def runRegression():
	# Load the diabetes dataset
	diabetes = datasets.load_diabetes()


	# Use only one feature
	diabetes_X = diabetes.data[:, np.newaxis, 2]

	# Split the data into training/testing sets
	diabetes_X_train = diabetes_X[:-20]
	diabetes_X_test = diabetes_X[-20:]

	# Split the targets into training/testing sets
	diabetes_y_train = diabetes.target[:-20]
	diabetes_y_test = diabetes.target[-20:]

	# Create linear regression object
	regr = linear_model.LinearRegression()

	# Train the model using the training sets
	regr.fit(diabetes_X_train, diabetes_y_train)

	# The coefficients
	print('Coefficients: \n', regr.coef_)
	# The mean square error
	print("Residual sum of squares: %.2f"
	      % np.mean((regr.predict(diabetes_X_test) - diabetes_y_test) ** 2))
	# Explained variance score: 1 is perfect prediction
	print('Variance score: %.2f' % regr.score(diabetes_X_test, diabetes_y_test))

	# # Plot outputs
	# plt.scatter(diabetes_X_test, diabetes_y_test,  color='black')
	# plt.plot(diabetes_X_test, regr.predict(diabetes_X_test), color='blue',
	#          linewidth=3)

	# plt.xticks(())
	# plt.yticks(())

	# plt.show()

def runkMeans():
	np.random.seed(42)

	digits = load_digits()
	data = scale(digits.data)

	n_samples, n_features = data.shape
	n_digits = len(np.unique(digits.target))
	labels = digits.target



	print("n_digits: %d, \t n_samples %d, \t n_features %d"
	      % (n_digits, n_samples, n_features))


	print(79 * '_')
	print('% 9s' % 'init'
	      '    time  inertia    homo   compl  v-meas     ARI AMI  silhouette')
	bench_k_means(KMeans(init='k-means++', n_clusters=n_digits, n_init=10),
              name="k-means++", data=data, l=labels)

	bench_k_means(KMeans(init='random', n_clusters=n_digits, n_init=10),
	              name="random", data=data, l=labels)

	# in this case the seeding of the centers is deterministic, hence we run the
	# kmeans algorithm only once with n_init=1
	pca = PCA(n_components=n_digits).fit(data)
	bench_k_means(KMeans(init=pca.components_, n_clusters=n_digits, n_init=1),
	              name="PCA-based",
	              data=data, l=labels)
	print(79 * '_')

	###############################################################################
	# Visualize the results on PCA-reduced data

	reduced_data = PCA(n_components=2).fit_transform(data)
	kmeans = KMeans(init='k-means++', n_clusters=n_digits, n_init=10)
	kmeans.fit(reduced_data)

	# Step size of the mesh. Decrease to increase the quality of the VQ.
	h = .02     # point in the mesh [x_min, m_max]x[y_min, y_max].

	# Plot the decision boundary. For that, we will assign a color to each
	x_min, x_max = reduced_data[:, 0].min() - 1, reduced_data[:, 0].max() + 1
	y_min, y_max = reduced_data[:, 1].min() - 1, reduced_data[:, 1].max() + 1
	xx, yy = np.meshgrid(np.arange(x_min, x_max, h), np.arange(y_min, y_max, h))
	Z = kmeans.predict(np.c_[xx.ravel(), yy.ravel()])

	# Put the result into a color plot
	Z = Z.reshape(xx.shape)
	plt.figure(1)
	plt.clf()
	plt.imshow(Z, interpolation='nearest',
	           extent=(xx.min(), xx.max(), yy.min(), yy.max()),
	           cmap=plt.cm.Paired,
	           aspect='auto', origin='lower')

	plt.plot(reduced_data[:, 0], reduced_data[:, 1], 'k.', markersize=2)
	# Plot the centroids as a white X
	centroids = kmeans.cluster_centers_
	plt.scatter(centroids[:, 0], centroids[:, 1],
	            marker='x', s=169, linewidths=3,
	            color='w', zorder=10)
	plt.title('K-means clustering on the digits dataset (PCA-reduced data)\n'
	          'Centroids are marked with white cross')
	plt.xlim(x_min, x_max)
	plt.ylim(y_min, y_max)
	plt.xticks(())
	plt.yticks(())
	plt.show()

def bench_k_means(estimator, name, data, l):
    t0 = time()
    estimator.fit(data)
    print('% 9s   %.2fs    %i   %.3f   %.3f   %.3f   %.3f   %.3f    %.3f'
          % (name, (time() - t0), estimator.inertia_,
             metrics.homogeneity_score(l, estimator.labels_),
             metrics.completeness_score(l, estimator.labels_),
             metrics.v_measure_score(l, estimator.labels_),
             metrics.adjusted_rand_score(l, estimator.labels_),
             metrics.adjusted_mutual_info_score(l,  estimator.labels_),
             metrics.silhouette_score(data, estimator.labels_,
                                      metric='euclidean',
                                      sample_size=sample_size)))


#runRegression()

runkMeans()