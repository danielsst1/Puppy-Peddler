import csv

with open('data.csv', newline='') as f:
    reader = csv.reader(f)
    data = list(reader)

stock1 = []
stock2 = []
stock3 = []
stock4 = []
stock5 = []
for i in range(1,len(data)):
    stock1.append(float(data[i][0]))
    stock2.append(float(data[i][1]))
    stock3.append(float(data[i][2]))
    stock4.append(float(data[i][3]))
    stock5.append(float(data[i][4]))
####print(data)
print("stock1")
print(stock1)

print("stock2")
print(stock2)

print("stock3")
print(stock3)

print("stock4")
print(stock4)

print("stock5")
print(stock5)
