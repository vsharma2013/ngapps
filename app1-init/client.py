from app import Employee

emp1 = Employee('Vishal', 111111)

emp1.displayInfo()

emp1.displayAllCount()


emp2 = Employee('Sharma', 222222)

emp2.displayInfo()

emp1.displayAllCount()

emp1.age = 55

print 'Employee 1 added age = ', emp1.age