class Employee:
	_gEmployeeCount = 0

	def __init__(self, name, sal):
		self.name = name
		self.salary = sal
		Employee._gEmployeeCount += 1

	def displayInfo(self):
		print 'My name is : %s  and my salary is : %d' % (self.name, self.salary)

	def displayAllCount(self):
		print 'Total Employee count = %d' % Employee._gEmployeeCount
