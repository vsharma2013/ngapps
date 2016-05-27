class Person:
	def __init__(self, name):
		self.name = name




class Employee(Person):
	_gEmployeeCount = 0

	def __init__(self, name, sal):
		Person.__init__(self, name)
		self.salary = sal
		Employee._gEmployeeCount += 1

	def displayInfo(self):
		print 'My name is : %s  and my salary is : %d' % (self.name, self.salary)

	def displayAllCount(self):
		print 'Total Employee count = %d' % Employee._gEmployeeCount
